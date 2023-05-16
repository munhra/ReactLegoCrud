import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LegoPartsCRUD } from './legoPartsCRUD';
import './index.css';

// TODO split this file into others by component, or check for other approach
// TODO unit tests
// TODO E2E tests
// TODO implement error handling

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LegoPartsCRUD />);