import { ImageBackground, StyleSheet, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { TextCustom as Text } from '../atoms/text';
import { SearchIcon } from '../../assets/icons/SearchIcon'
import { UserContext } from '../../context/user-context';

const Banner = () => {
    const { dbUser } = useContext(UserContext);

    return (
        <ImageBackground style={{ padding: 24, justifyContent: 'center', marginBottom: 24 }} source={require('../../assets/gradiants/Banner.png')} >
            <Text variant='medium'>
                {`Hola ${dbUser?.name ? dbUser.name : ''}!`}
            </Text>
            <Text variant='normal'>
                Como estuvo hoy?
            </Text>
            <View style={styles.searchInput}>
                <View style={{ padding: 6 }}>
                    <SearchIcon />
                </View>
                <TextInput />
            </View>
        </ImageBackground>
    )
}

export default Banner

const styles = StyleSheet.create({
    searchInput: {
        position: 'absolute',
        backgroundColor: '#FCEDF1',
        alignSelf: 'center',
        height: 40,
        top: 80,
        width: '90%',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'scroll'
    }
});