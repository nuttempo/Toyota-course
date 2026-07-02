import { useState } from 'react';
import { CARS } from '../data/cars';
import { getGroupOfVariant } from '../data/groups';
import { IconSearch, IconCar, IconDollar } from './Icons';
import './Sidebar.css';

const CATEGORIES = [
  { id: 'Personal Cars', label: '🚗 รถเก๋ง (Personal Cars)' },
  { id: 'SUV & PPV', label: '🚙 SUV & PPV' },
  { id: 'Commercial', label: '🛻 รถกระบะ (Commercial)' },
  { id: 'MPV', label: '🚐 MPV' },
  { id: 'Van', label: '🚐 รถตู้ (Van)' },
  { id: 'GR Performance', label: '🏎️ GR Performance' }
];

export default function Sidebar({ open, currentId, onSelect }) {
  const [search, setSearch] = useState('');

  // Find if current selected car belongs to a group
  const activeGroup = getGroupOfVariant(currentId);
  const activeGroupId = activeGroup ? activeGroup.groupId : null;

  // Search logic
  const handleSearch = () => {
    if (!search) return null;
    const query = search.toLowerCase();
    
    // Find all matching cars
    return Object.entries(CARS).filter(([code, car]) => {
      const match = car.title.toLowerCase().includes(query) || 
                    (car.slogan && car.slogan.toLowerCase().includes(query)) ||
                    car.type.toLowerCase().includes(query);
      return match;
    });
  };

  const searchResults = handleSearch();

  // Helper to build list of items for a category when no search is active
  const getCategoryItems = (catId) => {
    const items = [];
    const addedGroups = new Set();

    // Iterate through all cars
    for (const [code, car] of Object.entries(CARS)) {
      if (car.type !== catId) continue;

      const groupInfo = getGroupOfVariant(code);
      if (groupInfo) {
        if (!addedGroups.has(groupInfo.groupId)) {
          addedGroups.add(groupInfo.groupId);
          items.push({
            isGroup: true,
            id: groupInfo.groupId,
            title: groupInfo.title,
            slogan: groupInfo.slogan,
            firstVariantCode: groupInfo.variants[0].code
          });
        }
      } else {
        items.push({
          isGroup: false,
          id: code,
          title: car.title,
          slogan: car.slogan,
          code: code
        });
      }
    }
    return items;
  };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={() => onSelect(currentId)} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} aria-label="เลือกรุ่นรถ">
        <div className="sidebar-header">
          <div className="sidebar-title">🚗 เลือกรุ่นรถ</div>
          <div className="sidebar-search-wrap">
            <IconSearch />
            <input
              type="text"
              placeholder="ค้นหารุ่นรถ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sidebar-search-input"
            />
          </div>
        </div>
        <nav className="sidebar-nav">
          {!search && (
            <button
              className={`sidebar-item ${currentId === 'interest_rates' ? 'sidebar-item-active' : ''}`}
              onClick={() => onSelect('interest_rates')}
              style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-3)' }}
            >
              <span className="sidebar-item-icon"><IconDollar /></span>
              <span className="sidebar-item-label" style={{ fontWeight: 600 }}>
                ตารางดอกเบี้ยทั้งหมด
              </span>
            </button>
          )}
          {search ? (
            searchResults.length > 0 ? (
              searchResults.map(([code, car]) => {
                // If searched, show the specific variant directly
                return (
                  <button
                    key={code}
                    className={`sidebar-item ${currentId === code ? 'sidebar-item-active' : ''}`}
                    onClick={() => onSelect(code)}
                  >
                    <span className="sidebar-item-icon"><IconCar /></span>
                    <span className="sidebar-item-label">
                      <span>{car.title}</span>
                      <span className="sidebar-item-sub">{car.type}</span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="sidebar-no-results">ไม่พบข้อมูลรุ่นรถที่ค้นหา</div>
            )
          ) : (
            CATEGORIES.map(cat => {
              const items = getCategoryItems(cat.id);
              if (items.length === 0) return null;
              return (
                <div key={cat.id} className="sidebar-category-group">
                  <div className="sidebar-category-title">{cat.label}</div>
                  {items.map(item => {
                    const isActive = item.isGroup 
                      ? activeGroupId === item.id 
                      : currentId === item.id;
                    const clickTarget = item.isGroup ? item.firstVariantCode : item.code;

                    return (
                      <button
                        key={item.id}
                        className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
                        onClick={() => onSelect(clickTarget)}
                      >
                        <span className="sidebar-item-icon"><IconCar /></span>
                        <span className="sidebar-item-label">
                          <span>{item.title}</span>
                          {item.slogan && <span className="sidebar-item-sub">{item.slogan}</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
}
