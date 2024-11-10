import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { BeepingCircle, Button } from "@/components/uiElements";
import { router } from "expo-router";

const remoteUrl = "https://your-remote-url.com/upload"; // Replace with your actual URL

export default function Page() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      console.log("Requesting permissions...");
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant audio recording permissions."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log("Recording started");
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");
    if (!recording) return;

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri || null);
    setRecording(null);
    console.log("Recording stopped and saved at", uri);
    router.navigate({pathname:'/screens/voiceMatch',params:{birdName:'Robin'}})
  };

  const playRecording = async () => {
    if (audioUri) {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      await sound.playAsync();
    } else {
      Alert.alert("No recording found", "Please record something first.");
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const uploadRecording = async () => {
    if (!audioUri) {
      Alert.alert("No audio to upload", "Please record something first.");
      return;
    }

    try {
      const response = await fetch(audioUri);
      const blob = await response.blob();

      const uploadResponse = await fetch(remoteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "audio/wav",
        },
        body: blob,
      });

      if (uploadResponse.ok) {
        Alert.alert(
          "Upload successful",
          "Audio has been uploaded successfully!"
        );
      } else {
        Alert.alert("Upload failed", "Something went wrong with the upload.");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <View style={styles.container}> 
      <View style={{width:'80%',alignSelf:'center'}}>
        {
          isRecording &&   <BeepingCircle/>
        }
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
       
    
      {audioUri && (
        <>
          <Button
            title={isPlaying ? "Stop Playback" : "Play Recording"}
            onPress={isPlaying ? stopPlayback : playRecording}
          />
          <Button title="Upload Recording" onPress={uploadRecording} />
        </>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  justifyContent:'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
