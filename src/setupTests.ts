// react-testing-library renders components to the document's body.
// Importing cleanup-after-each will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';

// Add jest-dom's custom assertions
import 'jest-dom/extend-expect';
