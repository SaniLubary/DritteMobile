import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Navigation } from '../../App'
import { JournalEntry } from '../../utils/interfaces'
import { Emotion } from '../../screens/create-entry'

const Card = ({ emotions, journal, index }: { emotions: Emotion[], journal: JournalEntry, index: number }) => {
    const { navigate } = useNavigation<Navigation>()

    return (
        <TouchableOpacity onPress={() => navigate('ViewEntry', { entryId: journal._id })} key={index} style={styles.card}>
            {emotions.filter(emotion => emotion.value === journal.emotion)[0].emoji('normal')}
            <View style={{ width: '50%' }}>
                <Text style={styles.title}>{journal.title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{journal.description}</Text>
            </View>
            <View style={{ width: 200 }}>
                <Text>{journal?.createdAt && new Date(journal?.createdAt).getDate() + '/' + new Date(journal?.createdAt).getMonth()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
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
        color: 'black',
        overflow: 'hidden',
    },
})