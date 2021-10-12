import 'dart:convert';

class Friends {
  final int id;
  final String name;

  const Friends({
    required this.id,
    required this.name,
  });

  factory Friends.fromJson(Map<String, dynamic> json) {
    return Friends(
      id: json['id'] as int,
      name: json['name'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': this.id,
      'name': this.name,
    };
  }
}

class Geo {
  final String lat;
  final String lng;

  const Geo({
    required this.lat,
    required this.lng,
  });

  factory Geo.fromJson(Map<String, dynamic> json) {
    return Geo(
      lat: json['lat'] as String,
      lng: json['lng'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'lat': this.lat,
      'lng': this.lng,
    };
  }
}

class Address {
  final String street;
  final String suite;
  final String city;
  final String zipcode;
  final Geo geo;

  const Address({
    required this.street,
    required this.suite,
    required this.city,
    required this.zipcode,
    required this.geo,
  });

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      street: json['street'] as String,
      suite: json['suite'] as String,
      city: json['city'] as String,
      zipcode: json['zipcode'] as String,
      geo: Geo.fromJson(json['geo'] as Map<String, dynamic>),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'street': this.street,
      'suite': this.suite,
      'city': this.city,
      'zipcode': this.zipcode,
      'geo': this.geo,
    };
  }
}

class User {
  final int id;
  final double funds;
  final Address address;
  final List<int> friendIds;
  final List<Friends> friends;

  const User({
    required this.id,
    required this.funds,
    required this.address,
    required this.friendIds,
    required this.friends,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      funds: json['funds'] as double,
      address: Address.fromJson(json['address'] as Map<String, dynamic>),
      friendIds: List<int>.from(json['friendIds']),
      friends: List<Friends>.from((json['friends'] as List<dynamic>)
          .map((e) => Friends.fromJson(e as Map<String, dynamic>))),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': this.id,
      'funds': this.funds,
      'address': this.address,
      'friendIds': this.friendIds,
      'friends': this.friends,
    };
  }
}

void main() {
  final json = '''
{
	"id": 1,
	"funds": 1234.56,
	"address": {
		"street": "Kulas Light",
		"suite": "Apt. 556",
		"city": "Gwenborough",
		"zipcode": "92998-3874",
		"geo": {
			"lat": "-37.3159",
			"lng": "81.1496"
		}
	},
	"friendIds": [
		1,
		2
	],
	"friends": [
		{
			"id": 1,
			"name": "Joey"
		},
		{
			"id": 2,
			"name": "John"
		}
	]
}
''';
  final user = User.fromJson(jsonDecode(json));
  print(user);
}
