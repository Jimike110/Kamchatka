import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Calendar } from './ui/calendar';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Clock, Users, Calendar as CalendarIcon } from 'lucide-react';
import { TimeSlot, ServiceAvailability } from '../utils/servicesData';

interface TimeSlotSelectorProps {
  availability: ServiceAvailability[];
  selectedDate?: Date;
  selectedTimeSlots: string[];
  onDateSelect: (date: Date | undefined) => void;
  onTimeSlotToggle: (timeSlotId: string) => void;
  maxGuests?: number;
  className?: string;
}

export function TimeSlotSelector({
  availability,
  selectedDate,
  selectedTimeSlots,
  onDateSelect,
  onTimeSlotToggle,
  maxGuests = 6,
  className = ""
}: TimeSlotSelectorProps) {
  const getAvailabilityForDate = (date: Date): ServiceAvailability | undefined => {
    const dateString = date.toISOString().split('T')[0];
    return availability.find(a => a.date === dateString);
  };

  const getTimeSlotsPeriodLabel = (period: string) => {
    switch (period) {
      case 'morning': return '🌅 Morning';
      case 'afternoon': return '☀️ Afternoon';
      case 'evening': return '🌅 Evening';
      case 'night': return '🌙 Night';
      default: return period;
    }
  };

  const getTimeSlotCapacityColor = (timeSlot: TimeSlot) => {
    const availableSpots = timeSlot.capacity - timeSlot.booked;
    const utilization = timeSlot.booked / timeSlot.capacity;
    
    if (utilization >= 0.9) return 'bg-red-100 text-red-700 border-red-200';
    if (utilization >= 0.7) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const isDateAvailable = (date: Date): boolean => {
    const dateAvailability = getAvailabilityForDate(date);
    return dateAvailability?.timeSlots.some(slot => slot.available) || false;
  };

  const currentDateAvailability = selectedDate ? getAvailabilityForDate(selectedDate) : undefined;
  const availableTimeSlots = currentDateAvailability?.timeSlots.filter(slot => slot.available) || [];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Calendar Selection */}
      <div>
        <Label className="text-base font-medium mb-3 block">Select Date</Label>
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || !isDateAvailable(date);
              }}
              modifiers={{
                available: (date) => isDateAvailable(date),
                booked: (date) => {
                  const dateAvailability = getAvailabilityForDate(date);
                  if (!dateAvailability) return false;
                  return dateAvailability.timeSlots.every(slot => !slot.available);
                }
              }}
              modifiersStyles={{
                available: { 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: 'rgb(34, 197, 94)',
                  fontWeight: 'bold'
                },
                booked: { 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: 'rgb(239, 68, 68)',
                  textDecoration: 'line-through'
                }
              }}
              className="rounded-md border w-full"
            />
            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Fully Booked</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span>Unavailable</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div>
          <Label className="text-base font-medium mb-3 block">
            Available Time Slots for {selectedDate.toLocaleDateString()}
          </Label>
          
          {availableTimeSlots.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No available time slots for this date.</p>
                <p className="text-sm">Please select a different date.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {availableTimeSlots.map((timeSlot) => {
                const isSelected = selectedTimeSlots.includes(timeSlot.id);
                const availableSpots = timeSlot.capacity - timeSlot.booked;
                
                return (
                  <Card 
                    key={timeSlot.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-primary border-primary' : ''
                    }`}
                    onClick={() => onTimeSlotToggle(timeSlot.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{timeSlot.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {getTimeSlotsPeriodLabel(timeSlot.period)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{availableSpots} spots available</span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getTimeSlotCapacityColor(timeSlot)}`}
                              >
                                {timeSlot.booked}/{timeSlot.capacity} booked
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <Badge className="bg-primary text-primary-foreground">
                              Selected
                            </Badge>
                          )}
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTimeSlotToggle(timeSlot.id);
                            }}
                          >
                            {isSelected ? 'Remove' : 'Select'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {selectedTimeSlots.length > 0 && (
                <>
                  <Separator />
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Selected Time Slots:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTimeSlots.map((timeSlotId) => {
                        const timeSlot = availableTimeSlots.find(t => t.id === timeSlotId);
                        if (!timeSlot) return null;
                        
                        return (
                          <Badge key={timeSlotId} variant="default" className="flex items-center gap-1">
                            {timeSlot.time} ({getTimeSlotsPeriodLabel(timeSlot.period)})
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Booking Summary */}
      {selectedDate && selectedTimeSlots.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 text-primary">Booking Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Slots:</span>
                <span className="font-medium">{selectedTimeSlots.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span>Maximum Guests:</span>
                <span className="font-medium">Up to {maxGuests} people</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}