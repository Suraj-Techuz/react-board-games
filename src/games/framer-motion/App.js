import React, { useState } from 'react'; // Import useState
import GameBoard from './components/GameBoard';
import { Modal, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa'; // Import the info circle icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './FramerMotion.css'; // Custom CSS for FramerMotion

const FramerMotion = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center custom-margin-top">
            <h1 className="text-center mb-4 d-flex align-items-center">
                Memory Game
                <FaInfoCircle
                    className="ms-2 text-primary"
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={handleShow}
                />
            </h1>
            <GameBoard />

            {/* Modal for game instructions */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Game Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p className="mb-3">
                        <strong>The goal is to find and match all pairs of cards.</strong>
                    </p>
                    <p className="mb-3">
                        Flip over two cards at a time to find matching pairs. Your score depends on how quickly you can match all pairs.
                    </p>
                    <p className="mb-3">
                        <strong>Click on a Card:</strong> Flip a card to reveal its face. Remember the card's position and its image.
                    </p>
                    <p className="mb-3">
                        <strong>Match Pairs:</strong> Click on another card to reveal it. If it matches the first card, both cards will stay face-up. If they do not match, both will flip back over after a short delay.
                    </p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FramerMotion;
