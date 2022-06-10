import React, {Component} from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Image,
	StyleSheet,
	SectionList
} from 'react-native';

export default () => {
	const [isToggle, setIsToggle] = React.useState(false);
	const [toggleIndex, setToggleIndex] = React.useState('');
	const seperator = () => (
	            <View
	                style={{
	                    backgroundColor: '#000',
	                    height: 0.5,
	                    width: '100%'
	                }}
	            />
	);
	const renderRow = ({item, index}) => (
		<>
		<TouchableOpacity onPress={()=>{
			setIsToggle(!isToggle)
			setToggleIndex(index.toString())
		}}>
			<View style={{flexDirection : 'row', height : 45 ,paddingHorizontal : 15, width : '100%', borderTopWidth : 0.5, borderBottomWidth : 0.5}}>
					<View style={{flex : 0.8,flexDirection : 'row'}}>  
						<View style={{flex : 1,justifyContent : 'center'}}>
							<View style={{justifyContent : 'center'}}>
								<Text style={{fontSize : 18}}>{item.title }</Text>
							</View>
						</View>
					</View>
					<View style={{flex : 0.2, alignItems : 'flex-end', justifyContent : 'center'}}>
						<Image source={require('../assets/android-down-arrow-icon-8.jpg')} style={{height : 25, width : 25}} />
					</View>
			</View>
		</TouchableOpacity> 
		{ isToggle && index.toString() == toggleIndex ? 
			<FlatList 
				data={[{},{},{},{},{}]}
				ListHeaderComponent={(
					<View style={{paddingHorizontal : 15, height : 70 , flexDirection : 'row', justifyContent : 'flex-end'}}>
						<View style={{justifyContent : 'space-between', paddingVertical : 10, alignItems : 'center'}}>
							<Image source={require('../assets/97.png')} 
							style={{ resizeMode : 'contain', height : 25, width : 25}} /> 
							<View style={{justifyContent : 'center', alignItems : 'center'}}>
								<Text style={{fontSize : 10}}>Group Messages</Text>
							</View>
						</View> 
					</View>
				)}
				ItemSeparatorComponent={seperator}
				renderItem={({item, index})=>(
					<View style={{ flexDirection : 'row', height : 50 , width : '100%', backgroundColor : '#f3f3f3'}}>
						<View style={{flex : 0.2 , alignItems : 'center', justifyContent : 'center'}}>
							<Image source={require('../assets/AdobeStock_349979908.png')} 
							style={{resizeMode:'contain' , height : 35 , width : 35}} />
						</View>
						<View style={{flex : 0.8,justifyContent : 'center'}}>
							<View style={{justifyContent : 'center'}}>
								<Text>Ben Smart ,  General Manager</Text>
							</View>
						</View>
					</View>
				)}
				keyExtractor={(item, index) => index.toString()} 
			/> : null
		}
		</>
	)
	
	return (
		<FlatList 
			data={[
				{title : 'Team A'},
				{title : 'Team B'},
				{title : 'Team C'},
				{title : 'Team D'}
			]}
			keyExtractor={(item, index)=>index.toString()}
			renderItem={renderRow}
		 />
	)
}