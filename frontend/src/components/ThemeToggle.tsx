import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const handleClick = () => {
        console.log('Toggle clicked! Current theme:', theme);
        toggleTheme();
        console.log('After toggle, theme should be:', theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={handleClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Sun size={20} className="text-yellow-500" />
            ) : (
                <Moon size={20} className="text-gray-300" />
            )}
        </button>
    );
}
