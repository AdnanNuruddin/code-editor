/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { TouchableOpacity } from 'react-native';
import cppKeywordsByUsage from './cppKeyWords';

const Editor = (): JSX.Element => {

	const [code, setCode] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [responseData, setResponseData] = useState<{ error: string, output: string }>({ error: '', output: '' });

	const submitCode = async () => {
		setLoading(true);
		try {
			const response = await fetch('https://code.jomakhata.com', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ code }),
			});
			setResponseData(await response.json());
			setModalVisible(true);
			console.log(responseData);
		} catch (error: any) {
			Alert.alert('Error', error.message);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView>
			<CodeEditor
				initialValue={'// Write your code here'}
				style={{
					...{
						fontSize: 18,
						inputLineHeight: 18,
						highlighterLineHeight: 18,
					},
				}}
				language={'cpp'}
				onChange={(data) => { setCode(data); }}
				syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
				showLineNumbers
			/>
			<TouchableOpacity
				style={{
					borderWidth: 1,
					borderColor: 'blue',
					alignItems: 'center',
					justifyContent: 'center',
					width: 70,
					position: 'absolute',
					bottom: 50,
					right: 20,
					height: 70,
					backgroundColor: 'blue',
					borderRadius: 100,
					padding: 10,
					opacity: 0.8,
				}}
				onPress={() => { submitCode() }}
			>
				<View style={{ display: 'flex', alignItems: 'center' }}>
					<Text style={{ color: 'white', fontWeight:'bold', fontSize:35 }}>{loading ? '...' : '>>'}</Text>
				</View>
			</TouchableOpacity>

			<Modal
				animationType={'fade'}
				transparent={true}
				visible={modalVisible}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={{ fontSize: 18, fontFamily: 'consolas' }}>Output</Text>
						<Text style={{ fontSize: 45, fontFamily: 'consolas' }}>--------------------</Text>
						<Text style={{ fontSize: 16, fontFamily: 'consolas' }}>{responseData.output}</Text>
						<Text style={{ color: 'red', fontSize: 16, fontFamily: 'consolas' }}>{responseData.error}</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.textStyle}>Done</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

function App(): JSX.Element {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Editor />
			{/* <LocalHtmlView /> */}
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 5,
		backgroundColor: 'white',
		borderRadius: 2,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		paddingHorizontal: 25,
		backgroundColor: 'blue',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
export default App;
