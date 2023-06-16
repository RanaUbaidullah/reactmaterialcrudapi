import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./apiSlice";
ReactDOM.render(
    <ApiProvider api={apiSlice}>
<App />
</ApiProvider>
, document.getElementById('root'));

