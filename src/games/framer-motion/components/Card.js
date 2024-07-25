import React from 'react';
import { motion } from 'framer-motion';
import { Card as BootstrapCard } from 'react-bootstrap';
import './Card.css'; // Create a CSS file for card styles

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <motion.div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => onClick(card)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BootstrapCard className={`card-body ${isFlipped ? 'flipped' : ''}`}>
        {isFlipped ? (
          <BootstrapCard.Body className="card-number">
            {card.number}
          </BootstrapCard.Body>
        ) : (
          <BootstrapCard.Body className="card-back" />
        )}
      </BootstrapCard>
    </motion.div>
  );
};

export default Card;
