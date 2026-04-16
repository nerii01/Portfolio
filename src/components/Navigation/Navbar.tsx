import './Navbar.css';
import { useState } from 'react';

export default function Navbar() {
  const tabs = ['home', 'portfolio', 'blog', 'resume'];
  const [selectedTab, setSelectedTab] = useState<string>('');

  return (
    <div className="navbar_wrapper">
      <div className="navbar_left">
        <p>nerii</p>
      </div>

      <div className="navbar_right">
        {tabs.map((tab, index) => {
          return (
            <p
              onClick={() => {
                setSelectedTab(tab);
              }}
              key={index}
              className={`navbar_tab ${selectedTab == tab && "active"}`}>
              {tab}
            </p>
          );
        })}
      </div>
    </div>
  );
}
