export type Measurement = {
  m_id: number,
  sensor_uuid: string,
  co2: number,
  temperature: number,
  humidity: number,
  distance: number,
  movements: number,
  measure_timestamp: string|null,
  insert_timestamp: string
}