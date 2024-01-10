import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import db from '../config/firebaseConfig';


const NoteScreen = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'notes'), (snapshot) => {
            const fetchedNotes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(fetchedNotes);
        });
        return () => unsubscribe();
    }, []);

    const addNote = async () => {
        await addDoc(collection(db, 'notes'), { text: note });
        setNote('');
    };

    const confirmDeleteNote = (id) => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => deleteNote(id) },
            ],
            { cancelable: false }
        );
    };

    const deleteNote = async (id) => {
        await deleteDoc(doc(db, 'notes', id));
    };

    const styles = StyleSheet.create({
        noteContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            margin: 5,
            backgroundColor: '#e0e0e0',
            borderRadius: 5,
        },
        noteText: {
            fontSize: 16,
        },
        deleteButton: {
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: 'white',
        },
    });

    return (
        <View>
            <TextInput
                placeholder="Enter note"
                value={note}
                onChangeText={setNote}
            />
            <Button title="Add Note" onPress={addNote} />
            <FlatList
                data={notes}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.noteContainer}
                        onPress={() => confirmDeleteNote(item.id)}
                    >
                        <Text style={styles.noteText}>{item.text}</Text>
                        <View style={styles.deleteButton}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default NoteScreen;
