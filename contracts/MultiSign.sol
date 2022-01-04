// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MultiSign
 * @dev Allows multiple parties to agree on transactions before execution.
 * @author colorbay.org
 */
contract MultiSign {
    //委员会的最多人数
    uint256 public MAX_COMMITEE_COUNT = 101;

    //确认事件
    event Confirmation(address indexed sender, uint256 indexed transactionId);
    //撤销确认
    event Revocation(address indexed sender, uint256 indexed transactionId);
    //提交交易
    event Submission(uint256 indexed transactionId);
    //执行交易
    event Execution(uint256 indexed transactionId);
    //执行成功
    event ExecutionSuccess(uint256 indexed transactionId);
    //执行失败
    event ExecutionFailure(uint256 indexed transactionId);
    //添加委员会成员
    event CommiteeAddition(address indexed commitee);
    //移除委员会成员
    event CommiteeRemoval(address indexed commitee);
    //确认数量变更
    event RequirementChange(uint256 required);

    //交易id对交易的映射
    mapping(uint256 => Transaction) public transactions;
    //交易id对应委员会成员对应布尔的映射
    mapping(uint256 => mapping(address => bool)) public confirmations;
    //委员会成员地址对应布尔的映射
    mapping(address => bool) public isCommitee;
    //委员会地址数组
    address[] public commitees;
    //确认数量
    uint256 public required;
    //交易计数
    uint256 public transactionCount;

    //交易构造体
    struct Transaction {
        address destination; //目的地址
        bytes data; //交易数据
        bool executed; //已执行
    }

    modifier onlyAddressThis() {
        require(
            msg.sender == address(this),
            "MultiSign only address(this) can call this"
        );
        _;
    }

    /**
     * @dev 委员会成员不存在.
     */
    modifier commiteeNotExists(address commitee) {
        require(!isCommitee[commitee], "MultiSign commiteeNotExists() Error");
        _;
    }

    /**
     * @dev 委员会成员存在.
     */
    modifier commiteeExists(address commitee) {
        require(isCommitee[commitee], "MultiSign commiteeExists() Error");
        _;
    }

    /**
     * @dev 交易不存在.
     */
    modifier transactionExists(uint256 transactionId) {
        require(
            transactions[transactionId].destination != address(0),
            "MultiSign transactionExists() Error"
        );
        _;
    }

    /**
     * @dev 已确认.
     */
    modifier confirmed(uint256 transactionId, address commitee) {
        require(
            confirmations[transactionId][commitee],
            "MultiSign confirmed() Error"
        );
        _;
    }

    /**
     * @dev 未确认.
     */
    modifier notConfirmed(uint256 transactionId, address commitee) {
        require(
            !confirmations[transactionId][commitee],
            "MultiSign notConfirmed() Error"
        );
        _;
    }

    /**
     * @dev 未执行.
     */
    modifier notExecuted(uint256 transactionId) {
        require(
            !transactions[transactionId].executed,
            "MultiSign notExecuted() Error"
        );
        _;
    }

    /**
     * @dev 地址非空.
     */
    modifier notNull(address _address) {
        require(_address != address(0), "MultiSign notNull() Error");
        _;
    }

    /**
     * @dev 验证委员会成员数量.
     */
    modifier validRequirement(uint256 commiteeCount, uint256 _required) {
        require(
            commiteeCount > 0 &&
                commiteeCount <= MAX_COMMITEE_COUNT &&
                _required > 0 &&
                _required <= commiteeCount,
            "MultiSign validRequirement() Error"
        );
        _;
    }

    /**
     * @dev 构造函数
     */
    constructor() {
        isCommitee[msg.sender] = true;
        commitees.push(msg.sender);
        required = 1;
    }

    /**
     *
     * @dev 添加委员会成员,
     * @notice 成员不存在,验证成员.onlyAddressThis
     */
    function addCommitee(address commitee)
        public
        commiteeNotExists(commitee)
        notNull(commitee)
        validRequirement(commitees.length + 1, required)
        onlyAddressThis
    {
        isCommitee[commitee] = true;
        commitees.push(commitee);
        emit CommiteeAddition(commitee);
    }

    /**
     *
     * @dev 移除委员会成员
     * @notice 成员存在.onlyAddressThis
     */
    function removeCommitee(address commitee)
        public
        onlyAddressThis
        commiteeExists(commitee)
    {
        isCommitee[commitee] = false;
        for (uint256 i = 0; i < commitees.length - 1; i++) {
            if (commitees[i] == commitee) {
                commitees[i] = commitees[commitees.length - 1];
                break;
            }
        }
        commitees.pop();
        if (required > commitees.length) {
            changeRequirement(commitees.length);
        }
        emit CommiteeRemoval(commitee);
    }

    /**
     *
     * @dev 替换委员会成员,私有不公开
     * @notice 旧成员存在,新成员不存在.onlyAddressThis
     */
    function replaceCommitee(address commitee, address newCommitee)
        private
        onlyAddressThis
        commiteeExists(commitee)
        commiteeNotExists(newCommitee)
    {
        for (uint256 i = 0; i < commitees.length; i++) {
            if (commitees[i] == commitee) {
                commitees[i] = newCommitee;
                break;
            }
        }
        isCommitee[commitee] = false;
        isCommitee[newCommitee] = true;
        emit CommiteeRemoval(commitee);
        emit CommiteeAddition(newCommitee);
    }

    /**
     *
     * @dev 改变确认数量.
     * @param _required 确认数量.
     * @notice 验证确认数量.onlyAddressThis
     */
    function changeRequirement(uint256 _required)
        public
        onlyAddressThis
        validRequirement(commitees.length, _required)
    {
        required = _required;
        emit RequirementChange(_required);
    }

    /**
     *
     * @dev 委员会成员提交并确认交易
     * @param destination 目的地址.
     * @param data 交易数据.
     * @notice 委员会成员存在.
     * @return transactionId 返回交易ID.
     */
    function submitTransaction(address destination, bytes memory data)
        public
        commiteeExists(msg.sender)
        returns (uint256 transactionId)
    {
        transactionId = addTransaction(destination, data);
        confirmTransaction(transactionId);
    }

    /**
     *
     * @dev 委员会成员根据交易id确认交易.
     * @param transactionId 交易ID.
     * @notice 委员会成员存在,交易ID存在,未确认.
     */
    function confirmTransaction(uint256 transactionId)
        public
        commiteeExists(msg.sender)
        transactionExists(transactionId)
        notConfirmed(transactionId, msg.sender)
    {
        confirmations[transactionId][msg.sender] = true;
        emit Confirmation(msg.sender, transactionId);
        executeTransaction(transactionId);
    }

    /**
     *
     * @dev 撤销确认的交易
     * @param transactionId 交易ID.
     * @notice 委员会成员存在,已确认,未执行.
     */
    function revokeConfirmation(uint256 transactionId)
        public
        commiteeExists(msg.sender)
        confirmed(transactionId, msg.sender)
        notExecuted(transactionId)
    {
        confirmations[transactionId][msg.sender] = false;
        emit Revocation(msg.sender, transactionId);
    }

    /**
     *
     * @dev 执行交易.
     * @param transactionId 交易ID.
     * @notice 未执行.
     */
    function executeTransaction(uint256 transactionId)
        internal
        notExecuted(transactionId)
    {
        //如果已确认
        if (isConfirmed(transactionId)) {
            //创建交易构造体
            Transaction storage ta = transactions[transactionId];
            //已执行
            ta.executed = true;
            //发送交易
            (bool status, bytes memory returnedData) = ta.destination.call(
                ta.data
            );

            if (
                status &&
                (returnedData.length == 0 || abi.decode(returnedData, (bool)))
            ) {
                //交易成功
                emit ExecutionSuccess(transactionId);
            } else {
                //交易失败
                emit ExecutionFailure(transactionId);
                //交易失败
                ta.executed = false;
            }
        }
    }

    /**
     *
     * @dev 返回确认状态
     * @param transactionId 交易ID.
     * @return ret 确认状态.
     */
    function isConfirmed(uint256 transactionId) public view returns (bool ret) {
        uint256 count = 0;
        for (uint256 i = 0; i < commitees.length; i++) {
            //如果确认映射中交易id对应委员会成员为true
            if (confirmations[transactionId][commitees[i]]) {
                count++;
            }
            if (count >= required) {
                ret = true;
            }
        }
    }

    /**
     *
     * @dev 添加交易到交易映射,如果交易不存在.
     * @param destination 目的地址.
     * @param data 交易数据.
     * @notice 目的地址非空.
     * @return transactionId 交易ID.
     */
    function addTransaction(address destination, bytes memory data)
        internal
        notNull(destination)
        returns (uint256 transactionId)
    {
        transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            destination: destination,
            data: data,
            executed: false
        });
        transactionCount++;
        emit Submission(transactionId);
    }

    /**
     *
     * @dev 返回指定交易id的确认数量.
     * @param transactionId 交易ID.
     * @return count 确认数量.
     */
    function getConfirmationCount(uint256 transactionId)
        public
        view
        returns (uint256 count)
    {
        for (uint256 i = 0; i < commitees.length; i++) {
            if (confirmations[transactionId][commitees[i]]) {
                count++;
            }
        }
    }

    /**
     *
     * @dev 返回委员会成员数组.
     * @return 委员会成员地址数组
     */
    function getCommitees() public view returns (address[] memory) {
        return commitees;
    }

    /**
     *
     * @dev 返回指定交易ID中确认的委员会成员数组
     * @param transactionId 交易ID.
     * @return _confirmations 委员会成员地址数组
     */
    function getConfirmations(uint256 transactionId)
        public
        view
        returns (address[] memory _confirmations)
    {
        address[] memory confirmationsTemp = new address[](commitees.length);
        uint256 count = 0;
        for (uint256 i = 0; i < commitees.length; i++) {
            if (confirmations[transactionId][commitees[i]]) {
                confirmationsTemp[count] = commitees[i];
                count++;
            }
        }
        _confirmations = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            _confirmations[i] = confirmationsTemp[i];
        }
    }
}
