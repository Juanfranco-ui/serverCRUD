import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        // Check localStorage for saved preference
        const stored = localStorage.getItem('sidebarCollapsed');
        return stored ? JSON.parse(stored) : false;
    });

    useEffect(() => {
        // Save preference to localStorage whenever it changes
        localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }
    return context;
}
