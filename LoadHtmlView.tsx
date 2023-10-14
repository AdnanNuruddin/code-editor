/* eslint-disable prettier/prettier */

import React from 'react';
import { WebView } from 'react-native-webview';

const LocalHtmlPage = () => {
    return (
        <WebView
            source={{ uri: 'file:///android_asset/local.html' }} // Use 'file://' for iOS
        />
    );
};

export default LocalHtmlPage;
