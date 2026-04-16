import './Navbar.css';
import './Navpanel.css';
import { useState } from 'react';
import { FileUser, FolderOpen, Home, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <div className="navbar_wrapper">
      <div className="navbar_left">
        <p>nerii'</p>
      </div>
      <div className="navbar_right">
        <Navpanel />
      </div>
    </div>
  );
}

export function Navpanel() {
  const tabs = [
    { label: 'home', icon: <Home /> },
    { label: 'projects', icon: <FolderOpen /> },
    { label: 'blog', icon: <Info /> },
    { label: 'resume', icon: <FileUser /> },
  ];
  const [selectedTab, setSelectedTab] = useState<string>();

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
              animate={{ width: selected ? 'auto' : 0, skewX: selected ? "0deg" : "-20deg" }}
              transition={{ ease: 'circOut' }}>
              {tab.label}
            </motion.p>
          </motion.p>
        );
      })}
    </div>
  );
}
