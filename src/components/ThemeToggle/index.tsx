import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';
import Toggle from 'react-toggle';
import { useMediaQuery } from 'react-responsive';
import 'react-toggle/style.css';

const ThemeToggle: React.FC = () => {
    const storageKey = 'theme';
    const [isDark, setIsDark] = useState<boolean>(() => {
        const storedTheme = localStorage.getItem(storageKey);
        return storedTheme ? JSON.parse(storedTheme) : false; // Default to false if not set
    });

    useMediaQuery(
        {
            query: '(prefers-color-scheme: dark)',
        },
        undefined,
        (preferDark: boolean) => {
            setIsDark(preferDark);
        }
    );

    useEffect(() => {
        document.firstElementChild?.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem(storageKey, JSON.stringify(isDark));
    }, [isDark]);

    return (
        <div className='theme__toggle__container'>
            <Toggle
                checked={isDark}
                onChange={(event) => setIsDark(event.target.checked)}
                icons={false}
            />
        </div>
    );
};

export default ThemeToggle;