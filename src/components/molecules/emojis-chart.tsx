import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { JournalEntry } from '@app/utils/interfaces';
import { TextCustom } from '../atoms/text';
import { View } from 'react-native';

const EmojisChart = ({ journals }: { journals: JournalEntry[] }) => {
    function emotionMapper(emotion: number | string): number | string {
        switch (emotion) {
            case 'angry':
                return 1
            case 'sad':
                return 2
            case 'neutral':
                return 3
            case 'happy':
                return 4
            case 'love':
                return 5
            case '1':
                return 'mal'
            case '2':
                return 'triste'
            case '3':
                return 'neutral'
            case '4':
                return 'feliz'
            case '5':
                return 'super feliz'
            default:
                return ''
        }
    }

    const emojiData: number[] = journals.slice(0, 4).map(journal => emotionMapper(journal.emotion) as number);
    while ( emojiData.length < 5 ) {
        emojiData.push(1)
    }

    if (emojiData.every(emoji => emoji === 5)) {
        return <View>
            <TextCustom variant='title'>Lo siento!</TextCustom>
            <TextCustom variant='medium'>No tienes suficiente variedad de emociones para mostrar esta sección</TextCustom>
        </View>
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                <TextCustom variant='medium'>Estadistica de ultimas emociones</TextCustom>
            </View>
            <BarChart
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: emojiData,
                        },
                    ],
                }}  
                yAxisLabel=''
                yAxisSuffix=''
                width={300}
                height={200}
                chartConfig={{
                    decimalPlaces: 0,
                    formatYLabel: (yLabel) => emotionMapper(yLabel) as string,
                    backgroundGradientFrom: '#ffc2fb',
                    barPercentage: 0.8,
                    backgroundGradientTo: '#ffe4fd',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default EmojisChart;
