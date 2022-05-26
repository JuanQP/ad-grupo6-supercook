import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import RecipeCard from './RecipeCard';

function RecipeSideScroller({
  title, items, onVerTodosPress, onItemPress,
}) {
  return (
    <View>
      <View style={styles.sideScrollerTitle}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Button mode="text" onPress={onVerTodosPress}>Ver todos</Button>
      </View>
      <ScrollView horizontal>
        {items.map((i) => <RecipeCard key={`${i.id}`} recipe={i} onPress={onItemPress} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sideScrollerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

RecipeSideScroller.defaultProps = {
  items: [],
};

export default RecipeSideScroller;
