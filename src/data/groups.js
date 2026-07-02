export const GROUPED_CARS = {
  fortuner: {
    title: 'Fortuner',
    type: 'SUV & PPV',
    slogan: 'TRUSTWORTHY PPV',
    variants: [
      { code: 'fortuner_leader', name: 'Leader' },
      { code: 'fortuner_legender', name: 'Legender' },
      { code: 'fortuner_grsport', name: 'GR Sport' }
    ]
  },
  altis: {
    title: 'Corolla Altis',
    type: 'Personal Cars',
    slogan: 'TRUST IN THRILL',
    variants: [
      { code: 'altis', name: 'Altis' },
      { code: 'altis_grsport', name: 'GR Sport' }
    ]
  },
  yarisativ: {
    title: 'Yaris ATIV',
    type: 'Personal Cars',
    variants: [
      { code: 'yarisativ', name: 'ATIV HEV / Gasoline' },
      { code: 'yarisativ_nightshade', name: 'Nightshade' }
    ]
  },
  yariscross: {
    title: 'Yaris Cross',
    type: 'SUV & PPV',
    variants: [
      { code: 'yariscross', name: 'Cross' },
      { code: 'yariscross_nightshade', name: 'Nightshade' }
    ]
  },
  corollacross: {
    title: 'Corolla Cross',
    type: 'SUV & PPV',
    slogan: 'COMPLETE YOUR LIFE',
    variants: [
      { code: 'corollacross', name: 'Cross' },
      { code: 'corollacross_grsport', name: 'GR Sport' }
    ]
  },
  hilux_revo: {
    title: 'Hilux Revo',
    type: 'Commercial',
    variants: [
      { code: 'hilux_revo_standard', name: 'Standard Cab' },
      { code: 'hilux_revo_zedition', name: 'Z Edition' }
    ]
  },
  hilux_travo: {
    title: 'Hilux Travo',
    type: 'Commercial',
    variants: [
      { code: 'hilux_travo_standard_4trex', name: 'Standard Cab 4TREX' },
      { code: 'hilux_travo_prerunner_4trex', name: 'Prerunner & 4TREX' },
      { code: 'hilux_travo_overland', name: 'Overland' },
      { code: 'hilux_travo_e', name: 'Travo-e (EV)' }
    ]
  }
};

// Helper functions to work with groups
export function getGroupOfVariant(variantCode) {
  for (const [groupId, group] of Object.entries(GROUPED_CARS)) {
    if (group.variants.some(v => v.code === variantCode)) {
      return { groupId, ...group };
    }
  }
  return null;
}

export function isVariantOfGroup(variantCode) {
  return getGroupOfVariant(variantCode) !== null;
}
