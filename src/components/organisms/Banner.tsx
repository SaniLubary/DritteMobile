import { ImageBackground, StyleSheet, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { TextCustom as Text } from '../atoms/text';
import { SearchIcon } from '../../assets/icons/search-icon'
import { UserContext } from '../../context/user-context';
import { useScreenSize } from '../../hooks/useScreenSize';

const Banner = () => {
    const { dbUser } = useContext(UserContext);
    const {isMediumScreen} = useScreenSize()

    return (
        <ImageBackground style={isMediumScreen() ? styles.bannerMedium:styles.bannerLarge} source={require('../../assets/gradiants/Banner.png')} >
            <Text variant='medium'>
                {`Hola ${dbUser?.name ? dbUser.name : ''}!`}
            </Text>
            <Text variant='normal'>
                Como estuvo hoy?
            </Text>
            <View style={isMediumScreen() ? styles.searchInputMedium : styles.searchInputLarge}>
                <View style={{ padding: 6 }}>
                    <SearchIcon />
                </View>
                <TextInput style={{ width: '100%', color: 'black' }} />
            </View>
        </ImageBackground>
    )
}

export default Banner

const styles = StyleSheet.create({
    bannerMedium: { padding: 24, justifyContent: 'center', marginBottom: 24 },
    bannerLarge: { padding: 48, justifyContent: 'center', marginBottom: 34 },
    searchInputMedium: {
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
    },
    searchInputLarge: {
        position: 'absolute',
        backgroundColor: '#FCEDF1',
        alignSelf: 'center',
        height: 40,
        top: 145,
        width: '90%',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'scroll'
    }
});