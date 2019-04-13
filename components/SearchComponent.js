import React from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import searchIcon from '../images/search.png';

const SearchComponent = (props) => {
    const {onSearchTextChanged} = props;
    return (
        <View style={styles.container}>
            <TextInput onChangeText={onSearchTextChanged}
            style={styles.inputField}
            placeholder="Search.."/>
            <View style={
                {
                    justifyContent:'center',
                    alignItems:'center',
                    height:40
                }}>
                <TouchableOpacity onPress={props.onSearchPress}>
                    <Image source={searchIcon}
                    style={{width:40,height:40}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:10
    },
    inputField:{
        flex:1,
        height:40,
        borderWidth:1,
        borderColor:'rgb(138,164,191)',
        borderRadius:2,
        paddingLeft:10
    }
});

export default SearchComponent;

