import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface DesktopItemProps {
    label: String;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active,
}) => {
    const handleClick = () => {
        if(onClick){
            return onClick();
        }
    };
  return (
    <li onClick={handleClick}>
        <Link href={href}
        className={clsx()}>
        </Link>
    </li>
  )
}

export default DesktopItem