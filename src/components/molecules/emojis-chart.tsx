import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { View } from 'react-native';
import { JournalEntry } from '@app/utils/interfaces';

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
                return 'angry'
            case '2':
                return 'sad'
            case '3':
                return 'neutral'
            case '4':
                return 'happy'
            case '5':
                return 'love'
            default:
                return emotion
        }
    }

    const emojiData: number[] = journals.slice(-5).map(journal => emotionMapper(journal.emotion) as number);


    return (
        <View>
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
