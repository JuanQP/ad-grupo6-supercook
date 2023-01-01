import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import RecipeCard, { RecipeCardData } from './RecipeCard';

interface Props<T extends RecipeCardData> {
  title: string;
  items: T[];
  onVerTodosPress: () => void;
  onItemPress: (item: T) => void;
  onFavoritoPress: (item: T) => void;
}

function RecipeSideScroller<T extends RecipeCardData & { id: number }>({
  title, items, onVerTodosPress, onItemPress, onFavoritoPress
}: Props<T>) {
  return (
    <View>
      <View style={styles.sideScrollerTitle}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Button mode="text" onPress={onVerTodosPress}>Ver todos</Button>
      </View>
      <ScrollView horizontal>
        {items.map((i) => <RecipeCard key={`${i.id}`} recipe={i} onPress={onItemPress} onFavoritoPress={onFavoritoPress} />)}
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
