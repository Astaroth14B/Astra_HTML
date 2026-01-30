import React from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../context/UIContext';

const Home = () => {
    const { openUploadModal } = useUI();

    return (
        <section className="background">
            {/* Animated Pages */}
            <div className="book-container">
                <div className="book-page"></div>
                <div className="book-page"></div>
                <div className="book-page"></div>
                <div className="book-page"></div>
            </div>

            {/* Central Content */}
            <div className="hero-overlay">
                <div className="welcome-text" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '5rem', marginBottom: '10px' }}>
                        ARTIST'S <span className="highlight">CAVE</span>
                    </h2>
                    <p className="subtitle" style={{ fontSize: '1.8rem' }}>
                        You draw, we share.
                    </p>
                    <div className="buttons" style={{ justifyContent: 'center', marginTop: '40px' }}>
                        <Link to="/gallery" className="cyber-btn">ENTER THE CAVE</Link>
                        <div
                            className="cyber-btn"
                            onClick={openUploadModal}
                            style={{
                                background: 'var(--accent-gold)',
                                borderColor: 'var(--accent-gold)',
                                cursor: 'pointer',
                                color: '#fff'
                            }}
                        >
                            CONTRIBUTE ART
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
