import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Navigation } from '../../App'
import { JournalEntry } from '../../utils/interfaces'
import { Emotion } from '../../screens/create-entry'
import { TextCustom } from '../atoms/text'
import { useScreenSize } from '../../hooks/useScreenSize'

const Card = ({ emotions, journal, index }: { emotions: Emotion[], journal: JournalEntry, index: number }) => {
    const { navigate } = useNavigation<Navigation>()
    const { isMediumScreen } = useScreenSize()

    return (
        <TouchableOpacity onPress={() => journal._id && navigate('ViewEntry', { entryId: `${journal._id}` })} key={index} style={isMediumScreen() ? styles.cardSmall : styles.card}>
            {emotions.filter(emotion => emotion.value === journal.emotion)?.[0]?.emoji(isMediumScreen() ?'small': 'normal')}
            <View style={isMediumScreen() ? {flex: 1, marginLeft: 16} : { flex: 1, marginLeft: 8 }}>
                <TextCustom style={{ color: '#3A5545' }} variant='normalBold'>{journal.title}</TextCustom>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.description}>{journal.description}</Text>
                <TextCustom style={{ marginTop: 8, color: '#3A5545' }} variant='normal'>
                    {journal?.createdAt ? new Date(journal?.createdAt).getDate() + '/' + new Date(journal?.createdAt).getMonth() + "/" + new Date(journal?.createdAt).getFullYear() + " a las " + new Date(journal?.createdAt).getHours() + "hs": ''}
                </TextCustom>
            </View>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    cardSmall: {
        backgroundColor: '#FCEDF1',
        padding: 8,
        marginVertical: 4,
        borderRadius: 10,
        elevation: 1,
        color: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#FCEDF1',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3,
        color: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    description: {
        fontSize: 16,
        color: '#3A5545',
        overflow: 'hidden',
    },
})