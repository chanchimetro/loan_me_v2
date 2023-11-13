import { useEffect, useState } from "react";
import { axiosRestorePwd } from "../../services/userServices";
import { Button, Modal } from "react-bootstrap";
import { useNavigation } from "react-router-dom";

function RestorePwd() {

    const [restoreId, setRestoreId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [alertText, setAlertText] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('token');
        setRestoreId(token);
    })

    const handleCloseModal = () => {
        setShowModal(false);
    } 

    const handleChangePwd = (e) => {
        e.preventDefault();

        if(e.target.newPwd.length === 0) return;

        console.log("restoreId", restoreId);
        console.log("E", e.target.newPwd.value);
        axiosRestorePwd(restoreId, e.target.newPwd.value)
            .then(r => {
                setAlertText("Password has been restored.");
            })
            .catch(err => {
                setAlertText("There was an error while changing your password")
                console.log("LOL", err)
            })
        setShowModal(true);
    }

    return (
        <div>
            <form onSubmit={(e) => handleChangePwd(e)}>
                <label for="passwordInput" class="form-label">Nueva contraseña</label>
                <input type="password" class="form-control border border-secondary" name="newPwd" placeholder='Nueva contraseña' id="passwordInput" aria-describedby="pwdHelp" required />
                <button type="submit">Change Pwd</button>
            </form>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className='border-bottom border-secondary'>

                    <Modal.Title></Modal.Title>

                </Modal.Header>
                <Modal.Body>{alertText}</Modal.Body>
                <Modal.Footer className='border-top border-secondary'>
                    <Button variant="primary" onClick={handleCloseModal} className='bg-transparent btn-outline-success border border-2 border-success fw-semibold'>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RestorePwd;