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
} from 'react-native'
import TeamRender from '../components/TeamRender';

const RenderContacts = ({toggle , item }) => { 

	const [hide, setHide] = React.useState(false)

	if(toggle){
		return (
			<SectionList
	          sections={[
	            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
	            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
	          ]}
	          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
	          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
	          keyExtractor={(item, index) => index}
	        />	
		)
	} else {
		return null;
	} 
}

const seperator = () => (
            <View
                style={{
                    backgroundColor: '#000',
                    height: 0.5,
                    width: '100%'
                }}
            />
);

const RenderManagement = ({item, toggle , type}) => {

	const renderRow = ({item, index}) => {
		return (
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
		)
	}
	
	if(type=='Team' || toggle) {
		return (
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
				renderItem={renderRow}
				keyExtractor={(item, index) => index.toString()} 
			/>
		)
	} else {
		return null;
	}
}

const RenderSection = ({item}) => {
	const [toggle , setToggle] = React.useState(false);
 		
 	return (
 		<>
		<TouchableOpacity onPress={()=>setToggle(!toggle)}>
			<View style={{flexDirection : 'row', height : 70 ,paddingHorizontal : 15, width : '100%', borderTopWidth : 0.5, borderBottomWidth : 0.5}}>
					<View style={{flex : 0.8,flexDirection : 'row'}}>
						<View style={{flex : 0.2, justifyContent : 'center'}}>
							<View style={{height : 40 , width : 40, borderRadius : 50, alignItems : 'center', justifyContent : 'center', backgroundColor : '#ddd'}}>
								<Text>MG</Text>
							</View>
						</View>
						<View style={{flex : 0.8,justifyContent : 'center'}}>
							<View style={{justifyContent : 'center'}}>
								<Text style={{fontSize : 18}}>{item.title }  (11)</Text>
							</View>
						</View>
					</View>
					<View style={{flex : 0.2, alignItems : 'flex-end', justifyContent : 'center'}}>
						<Image source={require('../assets/android-down-arrow-icon-8.jpg')} style={{height : 25, width : 25}} />
					</View>
			</View>
		</TouchableOpacity>
		{item.title == 'Managements' ? 
		<RenderManagement toggle={toggle} /> : item.title == 'Teams' ? 
		<TeamRender toggle={toggle}  item={item}  /> : 
		<RenderContacts toggle={toggle} item={item}  />}
		</>
 	)	

}

export default class Contacts extends Component { 
	render() {
		return (
			<View style={styles.container}>
				<View style={{height : 150, width : '100%', backgroundColor : 'orange'}}>
				</View>
				<View style={{flex : 1 , backgroundColor : 'skyblue'}}>
					<FlatList 
						data={[
							{title : 'All'},
							{title : 'Teams'},
							{title : 'Managements'},
							{title : 'F&I Manager'},
							{title : 'Services'},
							{title : 'Sales Managers'}]
						}
						renderItem={({item, index})=><RenderSection item={item} />}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex : 1	
	},
	item: {
	    padding: 10,
	    fontSize: 18,
	    height: 44,
	  },
	  sectionHeader: {
	    paddingTop: 2,
	    paddingLeft: 10,
	    paddingRight: 10,
	    paddingBottom: 2,
	    fontSize: 14,
	    fontWeight: 'bold',
	    backgroundColor: 'rgba(247,247,247,1.0)',
	  }
})