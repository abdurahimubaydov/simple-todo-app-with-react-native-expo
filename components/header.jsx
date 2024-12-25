import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Header({ value, setValue, addData, addLoading }) {
    return (
        <View style={{
            width: '100%',
            paddingHorizontal: 20,
            marginTop: 15,
            flexDirection: 'row'
        }}>
            <TextInput
                style={styles.input}
                placeholder='add daily task'
                placeholderTextColor={'#gray'}
                value={value}
                onChangeText={e => setValue(e)}
            />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => addData()}
            >
                {addLoading && <ActivityIndicator size={'small'} />}
                {!addLoading && <Text style={{color: 'white', fontSize: 19, fontWeight: '700'}}>Add</Text>}
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },

    header: {
        fontSize: 35,
        marginHorizontal: 20,
        fontWeight: '700'
    },

    input: {
        width: '80%',
        borderColor: '#00000',
        borderWidth: 1.5,
        height: 40,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 10,
        fontSize: 17
    },

    addButton: {
        width: "20%",
        borderColor: '#00000',
        borderWidth: 0.5,
        height: 40,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white'
    }
});
