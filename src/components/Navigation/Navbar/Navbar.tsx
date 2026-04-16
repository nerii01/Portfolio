import './Navbar.css';
import './Navpanel.css';
import { useEffect, useRef, useState } from 'react';
import { FileUser, FolderOpen, Home, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScreenWidth } from '../../../hooks/useScreenWidth';

export default function Navbar() {
  const width = useScreenWidth();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navHeigh, setNavHeight] = useState<string>('');

  useEffect(() => {
    if (!navbarRef.current) return;
    setNavHeight(`${navbarRef.current.offsetHeight}px`);
  }, []);

  return (
    <>
      <div ref={navbarRef} className="navbar_wrapper">
        <div className="navbar_left">
          <p>nerii'</p>
        </div>
        <div className="navbar_right">{!(width <= 700) && <Navpanel />}</div>
      </div>

      {width <= 700 && (
        <div className="navpanel_wrapper_mobile">
          <Navpanel />
        </div>
      )}

      <div style={{height: navHeigh}}></div>
    </>
  );
}

export function Navpanel() {
  const tabs = [
    { label: 'home', icon: <Home /> },
    { label: 'projects', icon: <FolderOpen /> },
    { label: 'blog', icon: <Info /> },
    { label: 'resume', icon: <FileUser /> },
  ];
  const [selectedTab, setSelectedTab] = useState<string>('home');

  return (
    <div className="navpanel_wrapper">
      {tabs.map((tab, index) => {
        const selected = tab.label == selectedTab;
        return (
          <motion.p
            onClick={() => {
              setSelectedTab(tab.label);
            }}
            key={index}
            className={`navpanel_tab ${selected && 'active'}`}>
            {tab.icon}

            <motion.p
              style={{ overflow: 'hidden' }}
              initial={{ width: 0 }}
              animate={{
                width: selected ? 'auto' : 0,
                skewX: selected ? '0deg' : '-20deg',
              }}
              transition={{ ease: 'circOut' }}>
              {tab.label}
            </motion.p>
          </motion.p>
        );
      })}
    </div>
  );
}
