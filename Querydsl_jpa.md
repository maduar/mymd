# Querydsl + jpa

### 1. Pom.xml引入

```xml
<properties>
	<querydsl-jpa.version>4.1.4</querydsl-jpa.version>
</properties>

<depenency>
      <!-- https://mvnrepository.com/artifact/com.querydsl/querydsl-jpa -->
        <dependency>
            <groupId>com.querydsl</groupId>
            <artifactId>querydsl-jpa</artifactId>
            <version>${querydsl-jpa.version}</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/com.mysema.querydsl/querydsl-jpa -->
        <dependency>
            <groupId>com.querydsl</groupId>
            <artifactId>querydsl-apt</artifactId>
            <version>${querydsl-jpa.version}</version>
            <scope>provided</scope>
        </dependency>	
</depenency>

<build>
        <plugins>
            <plugin>
                <groupId>com.mysema.maven</groupId>
                <artifactId>apt-maven-plugin</artifactId>
                <version>1.1.3</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>process</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>target/generated-sources/java</outputDirectory>
                            <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
                        </configuration>
                    </execution>
                </executions>
                <dependencies>
                    <dependency>
                        <groupId>com.querydsl</groupId>
                        <artifactId>querydsl-apt</artifactId>
                        <version>${querydsl-jpa.version}</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>

    </build>
```

### 2. 生成dto

> 执行mvn compiler
>
> 会在target/generated-sources/annotations生成dto文件

### 3. 数据库配置

```shell
spring:
  datasource:
#    url: jdbc:mysql://150.109.49.131:3306/test
    jdbcUrl: jdbc:mysql://150.109.49.131:3306/test
    username: root
    password: maduarMysql
    driver-class-name: com.mysql.jdbc.Driver
    validationQuery: SELECT 1

  jpa:
    database-platform: org.hibernate.dialect.MySQL5Dialect
    show-sql: true
    hibernate.ddl-auto: update
```

> jpa默认读取spring.jpa下的属性

### 4. Querying

To use the JPA API you use `JPAQuery` instances for your queries like this:

```Java
// where entityManager is a JPA EntityManager
JPAQuery<?> query = new JPAQuery<Void>(entityManager);
```

```java
@Autowired
@PersistenceContext
private EntityManager entityManager;

QCustomer customer = QCustomer.customer;
Customer bob = queryFactory.selectFrom(customer)
  .where(customer.firstName.eq("Bob"))
  .fetchOne();
```

- and

  ```java
  queryFactory.selectFrom(customer)
      .where(customer.firstName.eq("Bob"), customer.lastName.eq("Wilson"));
  ```

  ```java
  queryFactory.selectFrom(customer)
      .where(customer.firstName.eq("Bob").and(customer.lastName.eq("Wilson")));
  ```

- or

  ```java
  queryFactory.selectFrom(customer)
      .where(customer.firstName.eq("Bob").or(customer.lastName.eq("Wilson")));
  ```


- join

  ```java
  @Data
  public class THotelForm {

      private int id;
      private String name;
      private String address;
      private String cityName;

  }

  QTCity tCity = QTCity.tCity;
  QTHotel tHotel = QTHotel.tHotel;

  JPAQuery<?> query = new JPAQuery<>(entityManager);

  JPAQuery<THotelForm> from = query
    .select(Projections.bean(
      THotelForm.class,
      tHotel.id,
      tHotel.name,
      tHotel.address,
      tCity.name.as("cityName")))
    .from(tCity, tHotel)
    .where(tCity.country.eq("1"));
  ```

### 5. General usage

- ###### Ordering

  ```java
  List<TCity> list = query
    .select(tCity)
    .from(tCity)
    .orderBy(tCity.name.desc())
    .fetchAll().fetchResults().getResults();
  ```

  ​