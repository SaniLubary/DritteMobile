import { TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PillBg from '../../assets/gradiants/bg-pill'
import { UserContext } from '../../context/user-context';
import { getJournals } from '../../services/journal-service';

const pill = ({text}:{text: string}) => {
    const { searchJournals, dbUser, setJournals } = useContext(UserContext);
    const [selectedPill, setSelectedPill] = useState('')


    useEffect(() => {
        if (dbUser?.email) {
            getJournals(dbUser.email).then((journals) => {
                journals.reverse()
                switch (selectedPill) {
                    case 'FELIZ':
                        setJournals(journals.filter(j => j.emotion === 'love' || j.emotion === 'happy'))
                        break;
                    case 'TRISTE':
                        setJournals(journals.filter(j => j.emotion === 'angry' || j.emotion === 'sad'))
                        break;
                    case 'NEUTRAL':
                        setJournals(journals.filter(j => j.emotion === 'neutral'))
                        break
                    default:
                        searchJournals()
                        break;
                }
            }).catch((err) => console.log('Journals not found: ', err))
        }
    }, [selectedPill])

    return (
        <TouchableOpacity
            style={{ marginHorizontal: 6 }}
            onPress={() => text !== selectedPill ? setSelectedPill(text) : setSelectedPill('')}>
            <PillBg color={selectedPill === text ? '#eb6098' : '#F2AEC0'} text={text} />
        </TouchableOpacity>
    )
}

export default pill