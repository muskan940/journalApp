package net.engineeringdigest.journalApp.entity;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import net.engineeringdigest.journalApp.enums.Sentiment;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "journal_entries")
@Data
@NoArgsConstructor
public class JournalEntry {


    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    @NonNull
    private String title;

    private String content;

    private java.time.LocalDateTime date;
    private Sentiment sentiment;

}




