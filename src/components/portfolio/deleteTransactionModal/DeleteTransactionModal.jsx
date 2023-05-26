import Modal from '../../UI/modal/Modal';
import classes from './DeleteTransactionModal.module.css';

const DeleteTransactionModal = () => {
  return (
    <Modal>
      <h1 className={classes.title}>Delete transaction</h1>
    </Modal>
  );
};

export default DeleteTransactionModal;