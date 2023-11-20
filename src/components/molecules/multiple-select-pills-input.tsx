import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserProfile } from '../../utils/interfaces';
import { ProfileCreationContext } from '../../context/profile-creation-context';

const pillWith = 80;

const Pill = ({ label, onPress, selected }: {label: string, onPress: () => void, selected: string | undefined}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.pill, { backgroundColor: selected ? '#D32455' : 'white' }]}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={[styles.pillText, { color: selected ? 'white' : '#D32455' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const MultipleSelectPillsInput = ({ title, pickOne = false, propertyUpdated, pillsData }: {
  title: string, pickOne?: boolean, propertyUpdated: keyof UserProfile, pillsData: string[]
}) => {
  const { answered, unanswered, localUser, setLocalUser } = useContext(ProfileCreationContext);
  const [selected, setSelected] = useState<string[]>(localUser && localUser[propertyUpdated] ? localUser[propertyUpdated] as Array<string> : []);

  const handlePillPress = (label: string) =>
    setSelected(prevSelected => {
      if (pickOne) {
        return [label]
      }

      const labelExistsIn = prevSelected ? prevSelected.findIndex(select => select === label) : -1;
      if (labelExistsIn !== -1) {
        if (labelExistsIn === 0 && prevSelected.length === 1) {
          return [];
        }
        const newSelected = [...prevSelected];
        newSelected.splice(labelExistsIn, 1);
        return newSelected;
      } else {
        if (prevSelected) {
          return [...prevSelected, label];
        } else return []
      }
    });

  useEffect(() => {
    setLocalUser(localUser => {
      console.log('Setting local user in multiple select input for local user', localUser, propertyUpdated, selected)
      return (localUser && { ...localUser, [propertyUpdated]: selected })
    })

    if (selected && selected.length > 0) {
      answered(title)
    } else {
      unanswered(title)
    }
  }, [selected])

  useEffect(() => {
    try {
      if (localUser && localUser[propertyUpdated]) {
        setSelected(localUser[propertyUpdated] as string[])
      }
    } catch (error) {
      console.error(error);
    }
  }, [propertyUpdated])

  const rows: ReactElement[] = useMemo(() => {
    const screenWidth = Dimensions.get('window').width;
    const maxPillsPerRow = Math.floor(screenWidth / pillWith);
    const _rows: ReactElement[] = [];
    for (let i = 0; i < pillsData.length; i += maxPillsPerRow) {
      const rowPills = pillsData.slice(i, i + maxPillsPerRow);
      _rows.push(
        <View key={i} style={styles.row}>
          {rowPills.map((label, index) => (
            <Pill
              onPress={() => handlePillPress(label)}
              selected={selected && selected.find(select => select === label)}
              key={index}
              label={label}
            />
          ))}
        </View>,
      );
    }
    return _rows;
  }, [selected, propertyUpdated]);

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  pill: {
    width: pillWith,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginRight: 5,
    marginLeft: 5,
  },
  pillText: {
    color: 'black',
  },
});

export default MultipleSelectPillsInput;
