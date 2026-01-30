import React, { useEffect, useState } from 'react';

const Loader = () => {
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState([]);
    const [accessGranted, setAccessGranted] = useState(false);

    useEffect(() => {
        const bootSequence = async () => {
            const addLine = (line) => setText(prev => [...prev, line]);

            await new Promise(r => setTimeout(r, 500));
            addLine("> INITIALIZING UPLINK...");

            await new Promise(r => setTimeout(r, 800));
            addLine("> BYPASSING FIREWALL...");

            await new Promise(r => setTimeout(r, 800));
            addLine("> DECRYPTING DATA STREAMS...");

            // Gibberish code rain effect
            const gibberishInterval = setInterval(() => {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
                const randomLine = Array(40).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
                setText(prev => {
                    const newLines = [...prev, randomLine];
                    if (newLines.length > 15) return newLines.slice(newLines.length - 15);
                    return newLines;
                });
            }, 50);

            await new Promise(r => setTimeout(r, 2500));
            clearInterval(gibberishInterval);
            setText([]); // Clear for final message

            setAccessGranted(true);

            await new Promise(r => setTimeout(r, 2000));
            setLoading(false);
        };

        bootSequence();
    }, []);

    if (!loading) return null;

    return (
        <div className={`system-loader ${!loading ? 'loaded' : ''}`} style={{
            background: 'black',
            color: accessGranted ? '#0f0' : 'var(--neon-cyan)',
            flexDirection: 'column',
            fontFamily: 'monospace',
            zIndex: 99999
        }}>
            {!accessGranted ? (
                <div className="terminal-text" style={{ width: '90%', maxWidth: '600px' }}>
                    {text.map((line, i) => (
                        <div key={i} style={{ marginBottom: '5px', textShadow: '0 0 5px var(--neon-cyan)' }}>{line}</div>
                    ))}
                </div>
            ) : (
                <div className="access-popup" style={{
                    border: '2px solid #0f0',
                    padding: '20px',
                    background: 'rgba(0, 50, 0, 0.9)',
                    boxShadow: '0 0 50px #0f0',
                    textAlign: 'center',
                    animation: 'popIn 0.3s ease-out'
                }}>
                    <h1 style={{ fontSize: '3em', margin: 0, textShadow: '0 0 20px #0f0' }}>ACCESS GRANTED</h1>
                    <p>WELCOME TO THE SYSTEM</p>
                </div>
            )}
        </div>
    );
};

export default Loader;
