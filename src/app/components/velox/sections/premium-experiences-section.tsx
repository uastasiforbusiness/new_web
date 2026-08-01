import React from 'react';
import styles from './premium-experiences-section.module.css';

const PremiumExperiencesSection = () => {
  return (
    <div className={`${styles.premiumExperiencesSection} luxury-card`}>
      <h2 className={styles.sectionTitle}>Premium Experiences</h2>
      <p className={styles.sectionDescription}>Discover our curated premium experiences combining luxury yachts, cars, and exclusive travel.</p>
      <div className={`${styles.premiumExperiencesGrid} luxury-grid`}>
        <div className={`${styles.premiumExperienceCard} luxury-card`}>
          <h3>Yacht Experience</h3>
          <p>Sail along the stunning Adriatic coast.</p>
        </div>
        <div className={`${styles.premiumExperienceCard} luxury-card`}>
          <h3>Luxury Car Tour</h3>
          <p>Drive the finest luxury cars.</p>
        </div>
      </div>
    </div>
  );

}

export default PremiumExperiencesSection;