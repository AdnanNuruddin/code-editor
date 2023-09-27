/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';

const Example = (): JSX.Element => {

  return (
    <SafeAreaView>
      <CodeEditor
        style={{
          ...{
            fontSize: 16,
            inputLineHeight: 16,
            highlighterLineHeight: 16,
          },
        }}
        language="cpp"
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
      />
    </SafeAreaView>
  );
};

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Example />
    </SafeAreaView>
  );

}

export default App;
