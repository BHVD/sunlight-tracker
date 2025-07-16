import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  language: string;
  onSelect: (value: string) => void;
}

const options = [
  { label: 'English', value: 'en' },
  { label: 'Norsk', value: 'no' },
  { label: 'Deutsch', value: 'de' },
];

export default function LanguageSelector({ language, onSelect }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const background = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const highlightColor = useThemeColor({}, 'tint');
  const overlayColor = useThemeColor({ light: 'rgba(0,0,0,0.3)', dark: 'rgba(255,255,255,0.2)' }, 'overlay');

  const currentLabel =
    options.find((opt) => opt.value === language)?.label || 'Select';

  return (
    <>
      <TouchableOpacity
        style={[
          styles.selectButton,
          {
            backgroundColor: background,
            borderColor,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectButtonText, { color: textColor }]}>
          {currentLabel}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: overlayColor }]}>
          <View style={[styles.modalContainer, { backgroundColor: background }]}>
            {options.map((item) => {
              const isSelected = item.value === language;
              return (
                <Pressable
                  key={item.value}
                  style={[
                    styles.modalOption,
                    isSelected && { backgroundColor: highlightColor + '22' },
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      {
                        color: isSelected ? highlightColor : textColor,
                        fontWeight: isSelected ? 'bold' : 'normal',
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  modalOption: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
