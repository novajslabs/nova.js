export const classDiagramExample = `
classDiagram
class GeoPointType {
 <<enumeration>>
  BROWNFIELD
  OGWELL
  CELL_TOWER
  NUCLEAR_REACTOR
  SUPERFUND
}
class GeoPoint {
  -UUID id
  +GeoPointType type
  +GeographyPoint location
  -UUID metadata references metadata(id)
  +Datetime createdAt
}
class GeographyPoint {
  <<interface>>
  +GeoJSON geojson
  +Int srid
  +Float longitude
  +Float latitude
}
class NearbyPoint {
 <<Interface>>
  -UUID id references GeoPoint(id)
  +GeoPointType GeoPoint::type
  +GeographyPoint GeoPoint::location
  +UUID GeoPoint::metadata
  +Float distance
}
class NearbyPoints {
<<Service>>
  +GeoJSON origin
  +Float radiusMi
  +Int first
  +Int last
  +Int offset
  +Cursor before
  +Cursor after
}
class Hotel {
 -UUID id
+String name
-Int objectid 
}
GeoPoint *-- GeoPointType: Composition
GeoPoint *-- GeographyPoint: Composition
GeoPoint "1" <|-- "1" NearbyPoint: Implements
NearbyPoints "1" -- "0..n"NearbyPoint: Contains
Hotel "1" -- "1" GeoPoint: May Contain
    
    `;