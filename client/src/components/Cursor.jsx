import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
            if (followerRef.current) {
                setTimeout(() => {
                    if (followerRef.current) {
                        followerRef.current.style.left = `${e.clientX}px`;
                        followerRef.current.style.top = `${e.clientY}px`;
                    }
                }, 50);
            }
        };

        document.addEventListener('mousemove', moveCursor);
        return () => document.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor"></div>
            <div ref={followerRef} className="cursor-follower"></div>
        </>
    );
};

export default Cursor;
