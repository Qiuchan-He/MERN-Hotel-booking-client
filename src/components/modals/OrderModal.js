import { Modal } from "antd";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  console.log(session);
  return (
    <Modal
      open={showModal}
      title="Order Payment info"
      onCancel={() => setShowModal(!showModal)}
    >
       <p>Payment status: {session.payment_status}</p> 
       <p>Amount total : {session.currency.toUpperCase()}{" "}{session.amount_total /100}</p> 
       <p>Customer: {orderedBy.name}</p> 
        
    </Modal>
  );
};

export default OrderModal;
