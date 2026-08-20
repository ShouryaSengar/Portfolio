/**
 * Public surface of the work feature.
 *
 * Only `Work` is exported. `CaseStudy` is an implementation detail — nothing outside
 * this feature should render one directly, and ESLint blocks reaching inside the tree
 * (see .kiro/steering/structure.md).
 */
export { Work } from './Work';
