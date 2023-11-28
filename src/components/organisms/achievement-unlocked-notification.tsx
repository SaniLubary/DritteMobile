import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useScreenSize } from '../../hooks/useScreenSize';
import { TextCustom as Text } from '../atoms/text';
import { Button } from '../atoms/button';
import BrittaNice from '../../assets/britta-2-full-bodie'
import { Achievements } from '../../utils/interfaces';
import { setAchievementNotified } from '../../services/achievements';

const AchievementUnlockedNotification = ({ achievement, setShowAlert }: { achievement: Achievements, setShowAlert: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { screenSize } = useScreenSize()

    const appearAnimation = useRef(new Animated.Value(screenSize.height)).current;

    const appear = () => {
        Animated.timing(appearAnimation, {
            toValue: screenSize.height / 10,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    const disappear = () => {
        console.log('asdfasdf')
        Animated.timing(appearAnimation, {
            toValue: screenSize.height,
            duration: 500,
            useNativeDriver: false,
            
        }).start(() => setShowAlert(false));
    };

    useEffect(() => {
        appear();
        setAchievementNotified(achievement._id)
    }, [])

    return (
        <View style={{ alignItems: 'center' }}>
            <Animated.View style={[styles.alert, { top: appearAnimation }]}>
                <Text variant='medium' style={{ textAlign: 'center', marginBottom: 24 }}>Logro desbloqueado!</Text>
                <View style={{ alignSelf: 'center' }}>
                    <BrittaNice width={100} height={200} style={{ alignSelf: 'center' }} />
                    <View style={{ flexDirection: 'column', width: screenSize.width/2 }}>
                        <Text variant='normal'>{achievement.name}</Text>
                        <Text variant='normal'>{achievement.description}</Text>
                    </View>
                </View>
                <Button onPress={() => disappear()} variant='secondary' title='Cerrar' textVariant='normal' />
            </Animated.View>
        </View>
    )
}

export { AchievementUnlockedNotification }

const styles = StyleSheet.create({
    alert: {
        position: 'absolute',
        padding: 30,
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 50
    }
})