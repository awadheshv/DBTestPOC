import React from 'react';

import { View,
        Text,
        StyleSheet,
        FlatList,
        Image,
    TouchableOpacity,
    RefreshControl,
    StatusBar,
    ActionSheetIOS
 }  from 'react-native';
import equityIcon from '../images/equityIcon.png';
import bondIcon from '../images/bondIcon.png';
import plus from '../images/plus.jpeg';
import minus from '../images/minus.jpeg';
import ItemSwipper from './ItemSwipper';
import SearchComponent from './SearchComponent';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
class TradingListComponent extends React.Component {
    static navigationOptions = {
        header: null,
        title:'Trading',
        tabBarIcon: <Ionicons name={`ios-home`} size={25}/>,
        tabBarLabel: 'Trading'

    };

    constructor(props){
        super(props);
        this.state = {
            expandedRecId:null,
            searchText:'',
            refreshing:false
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle("light-content");
        this.setState({refreshing:true});
        setTimeout(()=>{
            const data = [];
            for(let i=1; i< 200; i++){
                data.push({
                    recId:i,
                    securityName:`Test Security Name for Row ${i}`,
                    latestPrice:`$${i+1500}`,
                    expiryDate:'12/12/2021',
                    securityType:`${i%10 == 0 ? 'bond':'equity'}`
                });
            }

            this.setState({
                tradings:data,
                refreshing:false
            })
        },1000);
    }

    onExpandToggle = (recId) => {
        const {expandedRecId} = this.state;
        if(expandedRecId == recId){
            this.setState({expandedRecId:null});
        }else{
            this.setState({expandedRecId:recId});
        }
    }

    onSearchTextChanged = (text) => {
        this.setState({searchText:text})
    }

    renderTradingItem = (item) => {

        const securityType = item.item.securityType;
        let securityTypeIcon =  <Image source={equityIcon}
                                       style={{width:60,height:60}}/>;
        if(securityType === 'bond'){
            securityTypeIcon =  <Image source={bondIcon}
                                       style={{width:60,height:60}}/>;
        }
        const {expandedRecId} = this.state;
        return <View style={{flex:1}}>
            <View style={styles.row}>
                <View>
                {securityTypeIcon}
                </View>
                <View style={{flex:1,padding:5}}>
                    <View style={{flex:1,
                        paddingBottom:5,
                        paddingLeft:5,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgb(138,164,191)'}}>
                        <Text style={{color:'#FFFFFF',
                        fontSize:20}} numberOfLines={1}>
                            {item.item.securityName}
                        </Text>
                    </View>
                    <View style={{flex:1,
                        flexDirection:'row',
                        paddingTop:10,
                        paddingLeft:5}}>
                        <View style={{flex:1}}>
                        <Text style={{fontWeight: '700',
                        color:'#FFFFFF'}}>{item.item.latestPrice}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign: 'right'}}>{item.item.expiryDate}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{width:50,
                        justifyContent:'center',
                        alignItems:'center'}}
                        onPress={()=>this.onExpandToggle(item.item.recId)}>
                    <Image source={
                        (expandedRecId && expandedRecId == item.item.recId) ?
                            minus :plus
                    }
                    style={{width:30,height:30}} />
                </TouchableOpacity>
            </View>
            {
                (expandedRecId && expandedRecId == item.item.recId)
                && <View style={{height:300}}>
                    <ItemSwipper item={item.item}/>
                </View>
            }
        </View>
    }

    _onRefresh = () => {
        this.setState({refreshing:true});
        setTimeout(()=>{
            this.setState({refreshing:false});
        },2000);
    }

    onActionsClicked = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Submit','Cancel', 'Remove'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 1,
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    this.props.navigation.navigate('Details');
                }
            },
        );
    }

    render(){

//---------------
        let tradings = this.state.tradings ?
            this.state.tradings : [];
        if(this.state.searchText){
            tradings = _.filter(tradings,(data)=>{
                const value = data.securityName.indexOf(this.state.searchText)
                != -1;
               return value;
            });
        }
        //---------------


        return (
            <View style={styles.container}>
                <View style={{height:40}}>
                    <SearchComponent
                        onSearchTextChanged={this.onSearchTextChanged}
                        onSearchPress={this.onActionsClicked}/>
                </View>
                <View style={{flex:1,paddingTop:15}}>

                    <FlatList
                        refreshing={this.state.refreshing}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#FFFFFF"
                        />}
                        style={{flex:1}}
                        data={tradings}
                        keyExtractor={(item)=>item.recId}
                        renderItem={this.renderTradingItem}
                    />


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(0,136,202)',
        paddingTop:40
    },
    row:{
        padding:10,
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:1,
        margin:10,
        flex:1,
        flexDirection:'row'
    }
});

export default TradingListComponent;