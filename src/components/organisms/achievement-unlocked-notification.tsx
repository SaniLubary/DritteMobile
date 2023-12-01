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
    const opacityAnimation = useRef(new Animated.Value(0)).current;

    const appear = () => {
        Animated.timing(appearAnimation, {
            toValue: screenSize.height / 10,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    const disappear = () => {
        Animated.timing(appearAnimation, {
            toValue: screenSize.height,
            duration: 500,
            useNativeDriver: false,
        }).start(() => setShowAlert(false));
        Animated.timing(opacityAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        appear();
        setAchievementNotified(achievement._id)
    }, [])

    console.log(opacityAnimation)
    
    return (
        <View style={{ zIndex: 1 }}>
            <Animated.View style={{ opacity: opacityAnimation ? opacityAnimation : 1, position: 'absolute', alignItems: 'center', width: screenSize.width, height: screenSize.height, backgroundColor: `#16161644` }}></Animated.View>
            <Animated.View style={[styles.alert, { top: appearAnimation }]}>
                <Text variant='normalBold' style={{ textAlign: 'center', marginBottom: 8 }}>Logro desbloqueado!</Text>
                <View style={{ alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'column', width: screenSize.width/2 }}>
                        <Text style={{ textAlign: 'center' }} variant='normal'>{achievement.name}</Text>
                    </View>
                    <BrittaNice width={100} height={200} style={{ alignSelf: 'center' }} />
                    <View style={{ flexDirection: 'column', width: screenSize.width/2 }}>
                        <Text style={{ textAlign: 'center' }} variant='normal'>{achievement.description}</Text>
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
        alignSelf: 'center',
        padding: 30,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    }
})